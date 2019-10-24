<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="top"
              class="form_list" inline>
            <FormItem label="国家" prop="country">
                <Input v-model="formValidate.country" placeholder="请输入国家"></Input>
            </FormItem>
            <FormItem label="产品名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入产品名称"></Input>
            </FormItem>
            <FormItem label="下载链接" prop="link">
                <Input v-model="formValidate.link" placeholder="请输入下载链接"></Input>
            </FormItem>
            <FormItem label="金额" prop="price">
                <Input v-model="formValidate.price" placeholder="请输入金额"></Input>
            </FormItem>
            <FormItem label="利率" prop="interestRate">
                <Input v-model="formValidate.interestRate" placeholder="请输入利率"></Input>
            </FormItem>
            <FormItem label="评分" prop="score">
                <InputNumber :min="0" :max="5" v-model="formValidate.score" placeholder="请输入评分"></InputNumber>
            </FormItem>
            <FormItem label="产品公司名" prop="company">
                <Input v-model="formValidate.company" placeholder="请输入产品公司名"></Input>
            </FormItem>
            <FormItem label="产品标签" prop="proLabel">
                <Input v-model="formValidate.proLabel" placeholder="请输入产品标签"></Input>
            </FormItem>
            <FormItem label="评论" prop="desc">
                <Input v-model="formValidate.desc" placeholder="请输入产品评论"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
        <div class="uplogo">
            <div class="title">产品logo</div>
            
        </div>
        <div class="uploadList">
            <div class="title">产品介绍图片</div>
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="~~~~~"
                    style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src='imgName' v-if="visible" style="width: 100%">
            </Modal>
        </div>
    </div>
</template>
<style>
</style>

<script>
	export default {
		data() {
			return {
				formValidate: {
					country: '',
					name: '',
					link: '',
					price: '',
					interestRate: '',
					score: 5,
					company: '',
					desc: '',
					proLabel: '',

				},
				ruleValidate: {
					name: [
						{required: true, message: 'The name cannot be empty', trigger: 'blur'}
					],
					country: [
						{required: true, message: 'country cannot be empty', trigger: 'blur'},
					],
					link: [
						{required: true, message: 'The link cannot be empty', trigger: 'blur'}
					],
					price: [
						{required: true, message: 'The price cannot be empty', trigger: 'blur'}
					],
					interestRate: [
						{required: true, message: 'The interestRate cannot be price', trigger: 'blur'}
					],
					company: [
						{required: true, message: 'The company cannot be price', trigger: 'blur'}

					],
					proLabel: [{required: true, type: 'string', message: 'The proLabel cannot be empty', trigger: 'blur'},

					],
					desc: [
						{required: true, type: 'string', message: 'The desc cannot be empty', trigger: 'blur'},
					]
				},
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Message.success('Success!');
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			handleView(item) {
				this.imgName = item.url;
				this.visible = true;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload(file, a) {
				let _this = this
				let reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = e => {
					let _file = e.target.result
					let a = {
						name: file.name,
						status: "finished",
						uid: file.uid,
						url: _file,
					}
					_this.$refs.upload.fileList.push(a)
				}
				return false;
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>

<style lang="less" scoped>
    .form_list {
        padding: 30px 20px;
    }

    /deep/ .ivu-form-inline .ivu-form-item {
        width: 30% !important;
    }

    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .uplogo,.uploadList{
        margin: auto;
        text-align: center;
        margin-top: 50px;
    }
</style>


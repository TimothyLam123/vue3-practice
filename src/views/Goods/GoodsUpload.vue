<template>
<!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->
    <el-upload
        v-model:file-list="props.fileList"
        
        :action="upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
    >
        <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
  
<script setup>
    import { ref } from 'vue'
    import { Plus } from '@element-plus/icons-vue'

    import { host, upload } from '@/api/base'
    const props = defineProps(['fileList'])
    const emit = defineEmits(['sendImage'])

    //   import type { UploadProps, UploadUserFile } from 'element-plus'

    const fileList = ref([
        // {
        //     name: 'food.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
    ])

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)

    const handleSuccess=(response, file, fileList)=>{
        console.log('成功函数', response, file, fileList);
        let url = response.url.slice(7);
        let imgUrl = host + '/' + url;
        console.log(imgUrl);

        emit('sendImage', imgUrl)
    }

    const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
    }

    const handlePictureCardPreview = (uploadFile) => {
    // dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
    }
</script>

<style>

</style>
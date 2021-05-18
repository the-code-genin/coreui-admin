<template>
    <div class="image-picker-component d-flex justify-content-center" @click="selectImage">
        <input 
            :id="componentId" 
            type="file" 
            class="d-none" 
            accept="image/*" 
            :name="name" 
            @change="changeImage"
        />
        <img :src="imageSrc" class="img img-fluid" :class="{'img-rounded': rounded}"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EmptyImage from '@/assets/images/image-picker-empty.svg'
import EmptyUserImage from '@/assets/images/image-picker-user-empty.svg'

export default Vue.extend<any, any, any, any>({
    name: 'ImagePicker',
    props: {
        name: String,
        value: File,
        disabled: {
            type: Boolean,
        },
        placeholder: String,
        rounded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            id: ''
        }
    },
    methods: {
        selectImage() {
            // @ts-ignore
            document.querySelector(`#${this.componentId}`).click();
        },
        changeImage(e: any) {
            if (this.disabled == true) return;
            this.$emit('input', e.target.files[0]);
        }
    },
    computed: {
        componentId() {
            return 'image_picker_' + this.id;
        },
        imageSrc() {
            if (this.value != null) return URL.createObjectURL(this.value);
            else if (this.placeholder != null) return this.placeholder;
            else {
                if (this.rounded) return EmptyUserImage;
                else return EmptyImage;
            }
        }
    },
    created() {
        this.id = Math.random().toString().replace('.', '_');
    }
})
</script>

<style lang="scss" scoped>
.image-picker-component {
    cursor: pointer;
}

.image-picker-component:hover {
    opacity: 0.85;
}

.img-rounded {
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 50%;
}
</style>
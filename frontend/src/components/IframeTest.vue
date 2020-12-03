<template>
    <div class="page-container">
        <h1>IFRAME TEST</h1>
        <iframe
            :src="iframeSrc"
            :style="iframeStyle"
            title="iframeTest"
        />
    </div>
</template>

<script>
export default {
    name: 'IframeTest',
    data() {
        return {
            iframeSrc: '',
            iframeStyle: '',
            loaded: false
        }
    },
    mounted() {
        this.iframeSrc = `${window.location.origin}/chat`;
        this.iframeStyle = 'width: 90%; height: 800px;';
        this.loaded = true;
    }
}
</script>
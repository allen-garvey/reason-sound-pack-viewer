const bubbleAudioEventsMixinBuilder = () => ({
    emits: ['audioStart', 'audioStop'],
    methods: {
        bubbleAudioStart(event){
            this.$emit('audioStart', event);
        },
        bubbleAudioStop(event){
            this.$emit('audioStop');
        },
    },
});

export default bubbleAudioEventsMixinBuilder;

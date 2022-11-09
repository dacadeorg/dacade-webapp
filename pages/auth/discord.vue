<template>
    <div>
        Loading....
    </div>
</template>
<script>
export default {
    name: 'Discord',
    mounted() {
        this.connectDiscord();
    },
    methods: {
        async connectDiscord() {
            try {
                const { code } = this.$route.query;
                if (!code) throw new Error("Invalid discord auth code");

                const redirectURL = window.location.origin + '/auth/discord';

                await this.$api.post('/auth/discord', {
                    code,
                    redirectURL,
                });
                await this.$store.dispatch('user/fetch');
                this.$router.replace(this.localePath('/profile'))

            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
import Vue from 'vue';
Vue.prototype.$publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQ1RGrgcaq+5pytmZTGKJG/88Uj/FPbxqMSrlslN3B5RKi8DRa8q8bMldn6zftu7NQnAKvO4OodB2x7zWELjPAMrIBO92cXBgh9IA4n4VEcoAOmDqQQTjjb1LbsvTxJdmSM13js4CDnzSaohqUrlkC4bAJdeapOy9KeZBaqijYzwIDAQAB'; //公钥 加密
Vue.prototype.$privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANDVEauBxqr7mnK2ZlMYokb/zxSP8U9vGoxKuWyU3cHlEqLwNFryrxsyV2frN+27s1CcAq87g6h0HbHvNYQuM8AysgE73ZxcGCH0gDifhURygA6YOpBBOONvUtuy9PEl2ZIzXeOzgIOfNJqiGpSuWQLhsAl15qk7L0p5kFqqKNjPAgMBAAECgYBI7P8cq1cbQn2u7W9SOVoB/TbtcU7NdHkK4NVby6idG0ekyskdsX3gu3W2fnerd06pKbHuS5QwcUwlZOmFXTUImZGKiE5It4ex4++YT8beORuxQGRndOQ8rj2+wFiYhpN8ILXo+Np0h+SDM6HCTMM8n1HAMziI7N6cD0Hlb/rC0QJBAPAQkdLNN4r0IZ2h9l9P5I7XJ0030VtagwXiKlEWz5wx3sG+U2sgSsJteKP8rO+MjhdPX/oUBvHBwlJDNPLvc4sCQQDescP0ecaVZ0eY9cqGMk9EcOFuQAYMSM3IM8N1KNIPZLCOQjtww2crBcipHaM2/CMmV/y31oZlWl8JJQyjbEhNAkEApp/Zlyc5Vgj9DBxOlPku+rX7YW1MssuwBXVlScM7dn5mzrL7028mdKzm/2tx3RMBzMwbIcikyUhjSBW9uqDY4QJBALFeWLqRe09n0SjNK58y1tumJIbRS3/hRLVeNSFNf/FuuwizS/CGUdd8ZdP8nRCgRca2cbxiiuySy/rWnXhUOEkCQC8VclppYF7neQowS1pX5fRCDh7c0NGEAlsUFvZlTh+s0MaN5XSOSzA1V9E2KYNEe//ycrmU8iVrp5Jf48Ag7es='; //私钥 解密
export default {
    install(Vue)  {
        Vue.prototype.getToken = {
         
        }
    }
}
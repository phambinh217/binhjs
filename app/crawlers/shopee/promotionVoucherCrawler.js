'use strict';

const axios = require('axios');

async function crawlPromotionVoucher () {
    let { data: response } = await axios.get(`https://shopee.vn/api/v2/microsite/campaign_site_page?url=ma-giam-gia&platform=pc&_mod=microsite`);
    response = JSON.stringify(response);

    let promotionIdsMatch = response.match(/"promotion_id":([0-9]+)/g).map(item => {
        return item.slice(15);
    });

    let promotionSignatureMatch = response.match(/"promotion_signature":"([a-z0-9]+)"/g).map(item => {
        return item.slice(23, -1);
    });

    let promotionInfo = [];

    for (let index in promotionIdsMatch) {
        promotionInfo.push({
            promotionid: Number(promotionIdsMatch[index]),
            signature: promotionSignatureMatch[index]
        });
    }

    let promotionInfoString = JSON.stringify({ promotion_info: promotionInfo });

    return axios.post(`https://shopee.vn/api/v2/voucher_wallet/batch_get_vouchers_by_promotion_ids`, promotionInfoString, {
        headers: {
            'cookie': 'SPC_F=VIXN2BOu3oFKZRvkZ5w6kcQkT8Zw5inN; REC_T_ID=d6818222-85b5-11e9-a478-3c15fbdfdfab; cto_lwid=0a68d634-1998-4ebf-9a2f-df9fd171856e; _fbp=fb.1.1559535165639.554276181; _ga=GA1.2.607425181.1560595269; _hjid=6c50e827-03c0-4b70-8d10-1650e8dee035; fbm_421039428061656=base_domain=.shopee.vn; _gcl_aw=GCL.1573296102.CjwKCAiA5JnuBRA-EiwA-0ggPSo3zjOAVoekj_IYUqntn_wghlilKr2MjrNUPnJEmPbjmXvqRCtTtxoCVksQAvD_BwE; _gac_UA-61914164-6=1.1573296103.CjwKCAiA5JnuBRA-EiwA-0ggPSo3zjOAVoekj_IYUqntn_wghlilKr2MjrNUPnJEmPbjmXvqRCtTtxoCVksQAvD_BwE; SPC_IA=-1; _gcl_au=1.1.895511255.1575728647; G_ENABLED_IDPS=google; _fbc=fb.1.1577284336985.IwAR2kqDYM8YYeY_KslO3kXBIPVfIPbZ2afLBHiB837yW4Jxc2yoFOl5MR9YM; csrftoken=spqfp3zAULEbDq4ersxZ2MbyCZdYsLUA; SPC_SI=5hl6h6qgcyzunjzmfxvkdfu9567u0dn9; welcomePkgShown=true; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.730002773.1578134531; SPC_EC="EAHR7uW9UjSVnm3mQ+3HHYfvA58b3xu9dQegs1zTY/IxgPca/8rMGBZfidjbU44CYj7Bb60KDiFSt4TyK2pT3kn91v5VOacuA3DIyUC1YqKYVwCOdi7zTMApFEtCAcaeRdWsxVTT2T6R+ybRvwNGaYM/2QiYnbkCPBGPqccNVM8="; SPC_U=177180895; SPC_SC_TK=c0f2f9581af8135662197dd933a012e0; SPC_SC_UD=177180895; _med=affiliates; REC_MD_41_1000121=1578138415_0_50_0_48; REC_MD_30_2000807215=1578138715; REC_MD_20=1578138175; _dc_gtm_UA-61914164-6=1; SPC_T_IV="tnpaZNZ4SgutY+47IOlKDw=="; SPC_T_ID="x/Y6E0RjikX8SMzu/rMGpQqbVF7TDCHr+pjstVT9xwuHjLsWoNPw71+27syo9bKO51wBG2hLt+y9GF51xDT/DFolnDiAkR0l0edvKhZ2+b0="',
            'referer': 'https://shopee.vn/m/ma-giam-gia',
            'x-csrftoken': 'spqfp3zAULEbDq4ersxZ2MbyCZdYsLUA',
        }
    });
}

module.exports = crawlPromotionVoucher;

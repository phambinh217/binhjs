'use strict';

module.exports = [
    {
        id: 1,
        handle: 'balo-laptop',
        title: 'Balo laptop',
        image: 'https://cf.shopee.vn/file/f797e4f5c40313e83d4ab0564057ec89_tn',
        crawl: {
            titleIncludes: [
                ['balo', 'ba lo'],
                ['laptop', 'may tinh', 'lap top']
            ],
            shopee: {
                keyword: 'balo laptop',
                limit: 50,
                limitPage: 10,
                by: 'sales',
            }
        }
    },
    {
        id: 3,
        handle: 'balo-thoi-trang',
        title: 'Balo thời trang',
        image: 'https://cf.shopee.vn/file/16ef9895dbc9e8ab20e07dd0e16a0a3a_tn',
        crawl: {
            titleIncludes: [
                ['balo', 'ba lo'],
                ['thoi trang', 'fashion']
            ],
            shopee: {
                keyword: 'balo thời trang',
                limit: 50,
                limitPage: 10,
                by: 'sales',
            }
        }
    },
    {
        id: 4,
        handle: 'balo-cong-so',
        title: 'Balo công sở',
        image: 'https://cf.shopee.vn/file/5e22d359d7228354508e7f1e1a3c96c9_tn',
        crawl: {
            titleIncludes: [
                ['balo', 'ba lo'],
                ['cong so']
            ],
            shopee: {
                keyword: 'balo công sở',
                limit: 50,
                limitPage: 10,
                by: 'sales',
            }
        }
    },
    {
        id: 5,
        handle: 'tui-cheo',
        title: 'Túi chéo',
        image: 'https://cf.shopee.vn/file/2dd9f23ed3cb72aae597600e1a94e290_tn',
        crawl: {
            titleIncludes: [
                ['tui cheo', 'tui deo cheo', 'balo deo cheo', 'ba lo deo cheo'],
            ],
            shopee: {
                keyword: 'túi chéo',
                limit: 50,
                limitPage: 10,
                by: 'sales',
            }
        }
    },
    {
        id: 2,
        handle: 'balo-du-lich',
        title: 'Balo du lịch',
        image: 'https://cf.shopee.vn/file/d76716f69115d07033c95ba41300de3d_tn',
        crawl: {
            titleIncludes: [
                ['balo', 'ba lo', 'tui xach'],
                ['du lich', 'di choi']
            ],
            shopee: {
                keyword: 'balo du lịch',
                limit: 50,
                limitPage: 10,
                by: 'sales',
            }
        }
    },
]

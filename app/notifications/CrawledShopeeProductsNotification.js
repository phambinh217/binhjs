'use strict';

let { Notification } = require('@/cores/notification');

class CrawledShopeeProductsNotification extends Notification {
    constructor (data) {
        super();
        this.totalSkippedProduct = data.totalSkippedProduct;
        this.totalUpdatedProduct = data.totalUpdatedProduct;
        this.totalCreatedProduct = data.totalCreatedProduct;
        this.totalFailedProduct = data.totalFailedProduct;
    }

    get via () {
        return ['slack'];
    }

    get slackMessage () {
        return {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Crawl sản phẩm từ shoppe"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*- Tạo mới*: ${this.totalCreatedProduct}\n*- Cập nhật*: ${this.totalUpdatedProduct}\n*- Bỏ qua*: ${this.totalSkippedProduct}\n*- Lỗi*: ${this.totalFailedProduct}`
                    }
                }
            ]
        }
    }
}

module.exports = CrawledShopeeProductsNotification;

# Validator

## Cách sử dụng cơ bản
```js
const { validate } = requrie('@application/validator');

let data = {
    username: '',
    password: '',
}

let result = await validate(data, {
    username: 'required',
    password: 'required|same:12312',
});

console.log(result);
/*
    isPass(): Nhận định có dữ liệu có hợp lệ hay không, trả về true hoặc fales.
    getErrors(): Một mảng chứa các thông báo lỗi
 */
```

## Custom rules của riêng bạn


BinhJS chỉ có thể cung cấp được các rules phổ biến, chung chung. Nếu bạn muốn validate dữ liệu theo các rules của riêng bạn, thì bạn có thể làm như ví dụ dưới đây.

Ví dụ sau đây kiểm tra username phải khác 'john'
```js
let data = {
    username: 'john'
}

let result = await validate(data, {
    username: ['required', function (field, value) {
        console.log(field); // username
        console.log(value); // john

        return {
            getRuleName () {
                return 'username_unique'
            },

            isPass () {
                return value != 'john'
            },

            getErrorMessage () {
                return 'Username không được tên là john';
            }
        }
    }]
});
```

## Một số lưu ý
- validate() sẽ trả về một Promise, vì vậy bạn có thể sử dụng async/await
- Bạn cũng có thể sử dụng async/await trong hàm isPass()


## Ví dụ tổng quan

```js
let data = {
    parent: {
        child1: '',
        child2: '',
    },
    username: '',
    password: '123'
}

let result = await validate(data, {
    // Bạn cũng có thể sử dụng cú pháp dạng 'object.property1.property2' khi validate dữ liệu
    'parent.child1': 'required',

    // Tùy chỉnh thông báo lỗi,
    username: {
        rules: 'required',
        message: {
            required: 'Vui lòng điền username'
        }
    },

    // Bạn cũng có thể khai báo rules dưới dạng array
    password: ['required', 'same:123', function (field, value) {
        return {
            getRuleName () {
                return 'custom',
            },

            isPass () {
                return true; // or false
            },

            getErrorMessage () {
                return 'message error';
            }
        }
    }]
});
```

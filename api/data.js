export default {
    //整体数据结构示意，仅仅作为参考，不运行
    root: {
        client: {
            "clienId": {
                load: true,//clientId是存储在客户端localstorage的key,和gundb同步来说明，gundb是否网络通畅，并且可以使用
                upload: false,
            }
        },
        posts: {
            "key1": {
                title: "title",
                createdAt: "time",
                updatedAt: "time",
                coverUrl: "cover",
                id: 'uuid1'
            },
            "key2": {
                title: "title",
                createdAt: "time",
                updatedAt: "time",
                coverUrl: "cover",
                id: "uuid2"
            }
        },
        "posts/uuid1": {
            title: "title",
            createdAt: "time",
            updatedAt: "time",
            coverUrl: "cover",
            id: 'uuid1'
        },
        "posts/uuid2": {
            title: "title",
            createdAt: "time",
            updatedAt: "time",
            coverUrl: "cover",
            id: 'uuid2'
        },
        "post_body/uuid1": "post_body", //文章正文单独存储，以提高性能
        "tags/tagName": true, //存在判断
        "tags/uuid": {
            name: "tagName",
            createdAt: "time",
            id: "uuid",
            updatedAt: "time"
        },
        tags: {
            "key1": {
                name: "tagName",
                createdAt: "time",
                id: "uuid",
                updatedAt: "time"
            }
        }

    }
}
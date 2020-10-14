import htmlToImage from 'html-to-image';

export default function (Vue, context, { head }) {
    Vue.mixin({
        created: function () {
          var myOption = this.$options.myOption
          if (myOption) {
            console.log(myOption)
          }
        },
        methods: {
            OgGenerator(post){
                head.meta.push({
                    name: "title",
                    content: post.title
                });
            }
        },
    })

}  

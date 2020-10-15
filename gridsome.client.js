export default function (Vue, context, { head }) {
    Vue.mixin({
        data() {
            return {
                post: null,
                origin: document.location.origin,
            }
        },
        methods: {
            OgGenerator(post){
                this.post = post;
                this.buildCards().map(meta => {
                    head.meta.push(meta);
                })
            },

            buildCards(){
                return [
                    {
                        name: "og:title",
                        content: this.post.title
                    },
                    {
                        name: "og:type",
                        content: "article"
                    },
                    {
                        name: "og:url",
                        content: this.origin + this.post.path
                    },
                    {
                        name: "og:image",
                        content: this.origin + this.post.cover.src
                    },
                ]
            },

            oGImage(){
                // const markup = `
                //     <div class="bg-primary border-15 relative border-solid border-solidblue px-8 flex flex-row items-center justify-evenly py-8">
                //         <div class="post-title flex flex-col">
                //             <span class="font-body italic text-tiny">${this.post.category.title}</span>
                //             <h2 class="font-bold leading-tight text-2xl">
                //                 ${this.post.title}
                //             </h2>
                //             <div class="absolute bottom-0 mb-4">
                //                 <h2>By Samuel Olaegbe</h2>
                //                 <p>https://goodhands.github.io</p>
                //             </div>
                //         </div>
                //         <g-image src="~/media/Sam.jpg" class="h-48 rounded-full w-48"></g-image>
                //     </div>
                //     `;

            }
        },
    })

}  

const puppeteer = require('puppeteer');
const fs = require('fs');
const { fileURLToPath } = require('url');

class PageShot{

    html(markup){
        let html = `<!DOCTYPE html>`;
        html += `<html>`;
        html += `<head>${this.tailwindCSS()}</head>`;
        html += `<body class="p-32 py-12">`;
        html += markup;
        html += `</body>`;
        html += `</html>`;

        const url = this.buildPage(html);
        this.screenshot(url);
    }

    async screenshot(url){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({path: 'screenshot.png', clip: {
            height: 500,
            width: 500,
            x: 0,
            y: 0
        }});
        await browser.close();
    }

    buildPage(markup){
        const dir = __dirname + '/dist';

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(dir+'/page.html', markup);
        
        const file = __dirname + '/dist' + '/page.html';

        const url = "file:///" + file;

        return url;
    }

    fileExists(file){
        fs.access(file, fs.constants.X_OK, (err) => {
            if(err){
                console.log("%s doesn't exist", file)
            }else{
                console.log("%s exists", file)
            }
        })
    }

    tailwindCSS(){
        return `<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">`;
    }
}

// export default PageShot;

const page = new PageShot();

page.html(
    `<div class="bg-primary border-15 min-h-screen h-450 relative border-solid border-solidblue px-8 flex flex-row items-center justify-evenly py-8">
        <div class="post-title flex flex-col">
            <span class="font-body italic text-tiny">MySQL</span>
            <h2 class="font-bold leading-tight text-2xl">
                Optimizing Database Performance in Large Applications
            </h2>
            <div class="absolute bottom-0 mb-4">
                <h2>By Samuel Olaegbe</h2>
                <p>https://goodhands.github.io</p>
            </div>
        </div>
        <img src="https://scontent.flos1-1.fna.fbcdn.net/v/t1.0-9/37591205_2162910170613030_2076526222719844352_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_eui2=AeFgqHN6VRastYh--p7eQRQLYOh8KMHHsGxg6HwowcewbGms_p8qZS-utEs-hCYkwNYAQ-mT6lHUlo3-seHaVaNQ&_nc_ohc=8uV3vBbfpqMAX9Ilp-E&_nc_ht=scontent.flos1-1.fna&oh=94f9f3d2232dfad6201e838aa6d57ba9&oe=5FAE3FDD" class="h-32 rounded-full w-32"/>
    </div>
    <style>
        .border-solidblue{
            border-color: #2E2AFB;
        }
        .bg-primary{
            background-color: #FFF7EF;
        }
        .border-15{
            border-width: 15px;
        }
        .h-450{
            height: 450px;
        }
    </style>
    `
);
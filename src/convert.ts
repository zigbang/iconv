import fs from "fs"
import path from "path"
import iconv from "iconv-lite"
import languageEncoding from "detect-file-encoding-and-language"

(async () => {
    const dirname = process.argv[2]
    
    let isDirectory = false
    try {
        isDirectory = fs.lstatSync(dirname).isDirectory()
    } catch (e) {
    } finally {
        if (!isDirectory) {
            console.error("Please specify a directory name!")
            return
        }
    }
    
    await readDir(dirname)
})()

async function readDir(dirname: string) {
    const items = fs.readdirSync(dirname, { withFileTypes: true })
    for (const item of items) {
        if (item.isDirectory()) readDir(path.join(dirname, item.name))
        
        if (item.name.endsWith(".java")) {
            const filename = `${dirname}/${item.name}`
            const fileinfo = await languageEncoding(filename)
            const inputEncdoing = fileinfo.encoding || "EUC-KR"
            const outputEndoing = "utf8"

            if (fileinfo.encoding === "UTF-8") {
                console.log(`${filename} is ${inputEncdoing} already.`)
            } else {
                const inputStr = iconv.decode(fs.readFileSync(filename), inputEncdoing)
                const output = iconv.encode(inputStr, outputEndoing)
                fs.writeFileSync(filename, output)
                console.log(`${filename} changed from ${inputEncdoing} to ${outputEndoing}.`)
            }
        }
    }
}
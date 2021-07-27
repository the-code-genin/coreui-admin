export default class base64Encoder {
    static encode(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            
            reader.onloadend = function() {
                resolve(reader.result as string);
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    }
}
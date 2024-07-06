export function init(): Promise<void> {
    return new Promise(resolve => {

        if (document.readyState === 'complete') {
            resolve();
        } else {
            document.addEventListener('deviceready', () => {
                resolve();
            }, false);
        }
    });
}

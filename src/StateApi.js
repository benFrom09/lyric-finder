class StateApi
{
    constructor(data = []) {
        this.data = data;
    }
    setDictionnary() {
        const dict = {};
        Object.keys(this.data).map(key => {
            console.log(key);
            const {artist, title, lyrics } = this.data[key];
            if(dict[artist]) {
                dict[artist].push({
                    title,lyrics
                });
            } else {
                dict[artist] = [{title,lyrics}];
            }
        });
        return dict;
    }
}

export default StateApi;
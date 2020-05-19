import StateApi from '../StateApi';

const data = {
    "song1":{
        artist:"artist1",
        title:"title1",
        lyrics:"bla bla bla"
    },
    "song2":{
        artist:"artist1",
        title:"title2",
        lyrics:"bla bla bla blum"
    },
    "song3":{
        artist:"artist2",
        title:"title3",
        lyrics:"bla blum bla blum"
    }
}

const stateApi = new StateApi(data);

describe('StateApi', () => {
    it('Transform data to dictionnary',() => {
        const dict = stateApi.setDictionnary();
        const values =  [
            [
              { title: 'title1', lyrics: 'bla bla bla' },
              { title: 'title2', lyrics: 'bla bla bla blum' }
            ],
            [ { title: 'title3', lyrics: 'bla blum bla blum' } ]
          ];
        expect(Object.values(dict)).toEqual(values );
        expect(Object.keys(dict)).toEqual(["artist1","artist2"]);
    });
});


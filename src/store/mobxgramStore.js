import { extendObservable, action } from "mobx";
import axios from "axios";

const ROOTURL = "http://localhost:3001/photolist";
class Mobxgram {
  constructor() {
    extendObservable(this, {
      mobxgramList: [],
      getStore: action(() => {
        debugger;
        axios
          .get(ROOTURL)
          .then(response => {
            this.mobxgramList.replace(response.data);
          })
          .catch(() => {
            ///error
          });
      }),
      addPhoto: action(newPhoto => {
        this.mobxgramList = this.mobxgramList.concat(newPhoto);

        axios
          .post(ROOTURL, {
            ...newPhoto
          })
          .then(() => {})
          .catch(() => {
            //Error
          });
      }),
      increamentLikes: action(index => {
        var selectedListItem = this.mobxgramList[index];
        var newValue = {
          ...selectedListItem,
          likes: selectedListItem.likes + 1
        };

        this.mobxgramList = [
          ...this.mobxgramList.slice(0, index),
          newValue,
          ...this.mobxgramList.slice(index + 1)
        ];

        axios.put(ROOTURL + "/" + newValue.id, {
          ...newValue
        });
      }),
      addComments: action(({ index, author, text }) => {
        let mobxgramList = this.mobxgramList.slice();
        let selectedPhotoItem = mobxgramList[index];
        selectedPhotoItem.comments = [
          ...selectedPhotoItem.comments,
          {
            author,
            text
          }
        ];

        this.mobxgramList.replace(mobxgramList);
      })
    });
  }
}

export default new Mobxgram();

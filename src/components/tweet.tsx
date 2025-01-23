import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditInput = styled.textarea`
  padding: 8px;
  resize: none;
`;

const EditButton = styled.button`
  background-color: skyblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  width: 15%;
`;

const EditConfirmButton = styled.button`
  background-color: skyblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  width: 15%;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  margin-top: 4px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  width: 15%;
`;

function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [isLoding, setIsLoding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(tweet);
  const tweetDocRef = doc(db, "tweets", id);
  const user = auth.currentUser;

  const onEditConfirm = () => {
    if (user?.uid !== userId) return;
    try {
      setIsLoding(true);
      if (!user || isLoding || tweet === "" || tweet.length > 180) return;
      if (tweet === editInputValue) {
        setIsEditing(false);
        return;
      }
      updateDoc(tweetDocRef, {
        tweet: editInputValue,
      });
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(tweetDocRef);
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? null : <Payload>{tweet}</Payload>}
        {user?.uid === userId ? (
          <>
            {isEditing ? (
              <EditForm>
                <EditInput
                  onChange={(e) => setEditInputValue(e.target.value)}
                  value={editInputValue}
                />
                <EditConfirmButton onClick={onEditConfirm}>
                  수정
                </EditConfirmButton>
              </EditForm>
            ) : (
              <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            )}
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          </>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}

export default Tweet;

import { useState } from "react";
import { Container } from "../styles/Home";
import  FileInput from "../styles/ImageContainer";
import Image from "../styles/Image";

const UploadImage = () => {

    const [imageFile, setImageFile] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [fileURL, setFileURL] = useState<string>('');

    const [test, setTest] = useState<string>('');

    const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && imageFile !== files[0]) {
            setImageFile(files[0]);

            const file = new FileReader();
            file.onload = () => {
                setPreviewImage(file.result);
            }
            file.readAsDataURL(files[0]);
        }
    }

    const onClickInfo = async () => {
        if (previewImage != null) {
            setFileURL(previewImage.toString());
            const data = await fetch('http://127.0.0.1:5000/', {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
                body: JSON.stringify({
                    "image": fileURL
                })
            });
            const response = await data.text();
            alert(response);
        }
    }

    // The below method tests if the result of the interactions b/t client & server performed as intended
    const getTestResults = async () => {
        const response = await fetch('http://127.0.0.1:5000/')
        const data = await response.text();
        setTest(data);
        alert(data);
    }

    return (
        <Container>
            <FileInput type="file" accept="image/*" onChange={fileHandler} />
            <Image src={previewImage as string} alt="" />
            <button onClick={onClickInfo}>Get Information</button>
            <br/>
            {/* test: The below image + button outputs the result of the interactions between client and server */}
            <Image src={test} alt="" />
            <button onClick={getTestResults}>Get Test Results</button>
        </Container>
    );

}

export default UploadImage;
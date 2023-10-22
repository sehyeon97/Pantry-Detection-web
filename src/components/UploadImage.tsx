import { useState } from "react";
import { Container } from "../styles/Home";

const UploadImage = () => {

    const [imageFile, setImageFile] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>();

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

    return (
        <Container>
            <input type="file" onChange={fileHandler}/>
            <img src={previewImage as string} alt="Preview" />
        </Container>
    );

}

export default UploadImage;
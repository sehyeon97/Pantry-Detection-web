import { useState } from "react";
import { Container } from "../styles/Home";
import ImageContainer, { FileInput } from "../styles/ImageContainer";
import Image from "../styles/Image";

const UploadImage = () => {

    const [imageFile, setImageFile] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

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
            <ImageContainer>
                <FileInput type="file" accept="image/*" onChange={fileHandler} />
                <Image src={previewImage as string} alt="" />
            </ImageContainer>
        </Container>
    );

}

export default UploadImage;
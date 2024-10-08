'use client'
import { CldUploadWidget } from 'next-cloudinary';
 
const [resource, setResource] = useState();
 
<CldUploadWidget
  signatureEndpoint="/api/sign-cloudinary-params"
  onSuccess={(result, { widget }) => {
    setResource(result?.info);  // { public_id, secure_url, etc }
  }}
  onQueuesEnd={(result, { widget }) => {
    widget.close();
  }}
>
  {({ open }) => {
    function handleOnClick() {
      setResource(undefined);
      open();
    }
    return (
      <button onClick={handleOnClick}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const NoImage = () => {
    return (
        <div className="flex flex-col items-center text-gray-500">
            <FontAwesomeIcon icon={faImage} className="text-4xl" />
            <p>No Image</p>
        </div>
    );
}

export default NoImage;
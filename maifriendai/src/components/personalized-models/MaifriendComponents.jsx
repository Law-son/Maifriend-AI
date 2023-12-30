import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const MaifriendComponents = ({
  itemId,
  name,
  imageLink,
  role,
  onClick,
  selected,
}) => {
  return (
    <Link
      to={`/maifriend-list/chat-interface?id=${itemId}&imageLink=${imageLink}&role=${role}&name=${name}`}
    >
      <Card className="inline-block mx-2 h-56 min-w-40 cursor-pointer">
        <div className="flex flex-col items-center pb-1">
          <img
            alt="Bonnie image"
            height="90"
            src={imageLink}
            width="90"
            className="mb-1 rounded-full shadow-lg bg-lightDark"
          />
          <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white overflow-clip">
            {name}
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 overflow-clip max-w-xs text-center">
            {role}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default MaifriendComponents;

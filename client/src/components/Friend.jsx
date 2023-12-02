import axios from "axios";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { baseURL } from "utils/Config";

const { useTheme, Box, Typography, IconButton } = require("@mui/material");
const { useDispatch, useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");

const Friend = ({ friendId, fullName, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isSelf = friendId === _id;

  const patchFriend = async () => {
    axios({
      method: "PATCH",
      url: `${baseURL}/users/${_id}/${friendId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        dispatch(setFriends({ friends: response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // Force reload when url changes and component doesnt rerender
            // ToDo: Alternate solution for navigation issue
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                fontSize: "0.75rem",
              },
            }}
          >
            {fullName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isSelf && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;

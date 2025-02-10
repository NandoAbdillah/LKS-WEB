import { createRef } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function ManageGame() {
  const params = useParams();
  const gameSlug = params.slug;
  const titleRef = createRef();
  const descriptionRef = createRef();
  const gameFileRef = createRef();

  const handleUpdateGame = async () => {
    try {
      const payload = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      };
      const response = await axiosClient.put(`games/${gameSlug}`, payload);

      console.log(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };
}

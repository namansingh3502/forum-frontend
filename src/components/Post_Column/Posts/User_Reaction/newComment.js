import { BsArrowRightCircleFill } from "react-icons/all";
import UserImage from "./userImage";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function NewComment(props) {
  const user = JSON.parse(localStorage.getItem("user_profile"));
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitDisabled(true);

    data.post = props.post_id;
    try {
      const res = await axios.post(`api/forum/new_comment`, data, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      });
      if (res.status === 200) {
        props.addComment(res.data);
        reset({ body: "" });
        setIsSubmitDisabled(false)
      }
    } catch (e) {
      setError("server_error", {
        type: "",
        message: "Some error occurred while saving comment.",
      });
      setIsSubmitDisabled(false);
    }
  };

  return (
    <div className={"w-full"}>
      <div className={"flex items-start w-full py-2"}>
        <UserImage image={user.user_image} />
        <form
          className={"w-full h-auto flex items-start pl-2"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            className={
              "w-full h-16 p-2 mx-1 resize-none bg-slate-600 bg-opacity-30 text-slate-200 placeholder:text-slate-300" +
              "text-white text-lg border-none focus:outline-none rounded-xl overflow-auto"
            }
            {...register("body", { required: "field required" })}
            placeholder={"Write a comment..."}
            autoFocus
          />
          <button
            type={"submit"}
            onClick={() => {
              clearErrors();
            }}
            disabled={isSubmitDisabled}
          >
            <BsArrowRightCircleFill
              className={"ml-1 mt-1 h-9 w-9 text-lg fill-gray-500"}
            />
          </button>
        </form>
      </div>
      <div>
        {errors.server_error && (
          <p className={"text-red-600 ml-4"}>*{errors.server_error.message}</p>
        )}
      </div>
    </div>
  );
}

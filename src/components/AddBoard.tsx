import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { todoBoard } from "../atoms";

const Form = styled.form`
    display: flex;
    gap: 10px;
    position: relative;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 15px 30px 15px 15px;
    border-width: 0 0 1px;
    border-style: solid;
    border-color: white;
    background: transparent;
    color: white;
    &::placeholder {
        color: white;
    }
    outline: none;
`;

const Button = styled.button`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 16px;
    color: white;
    cursor: pointer;
`;

interface IBoardProps {
    boardName: string;
}

function AddBoard() {
    const setBoard = useSetRecoilState(todoBoard);
    const { register, setValue, handleSubmit } = useForm<IBoardProps>();
    const onValid = ({ boardName }: IBoardProps) => {
        if (boardName.trim() === "") {
            alert("Board명은 필수 입력입니다.");
            return;
        }

        setBoard((allBoard) => {
            return {
                ...allBoard,
                [boardName]: [],
            };
        });

        setValue("boardName", "");
    };
    const onError = (error: any) => alert("Board명을 입력해주세요.");
    return (
        <Form onSubmit={handleSubmit(onValid, onError)}>
            <Input
                type="text"
                placeholder="Board명을 입력해주세요"
                {...register("boardName", {
                    required: "Please write a to do",
                })}
            />
            <Button>
                <FontAwesomeIcon icon={faArrowRight} />
            </Button>
        </Form>
    );
}

export default AddBoard;

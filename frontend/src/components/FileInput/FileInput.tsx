import { useRef, useState, type ChangeEvent } from "react";
import { Button, Grid, TextField } from "@mui/material";

interface IFileINput {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	label?: string;
}

const FileInput = ({ label, name, onChange }: IFileINput) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState("");

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFileName(e.target.files[0].name);
		} else {
			setFileName("");
		}

		if (typeof onChange === "function") onChange(e);
	};

	const activeInput = () => {
		if (inputRef.current) {
			inputRef.current?.click();
		}
	};
	return (
		<div>
			<input
				className='hidden'
				ref={inputRef}
				name={name}
				type='file'
				onChange={onFileChange}
			/>

			<Grid container direction={"row"} spacing={2} alignItems={"center"}>
				<TextField
					disabled
					variant='outlined'
					fullWidth
					label={label}
					value={fileName}
					onClick={activeInput}
					style={{ width: "20%" }}
				/>
				<Button
					variant='contained'
					style={{ background: "rgb(55, 65, 81)", padding: 15 }}
					onClick={activeInput}
				>
					BROWSE
				</Button>
			</Grid>
		</div>
	);
};

export default FileInput;

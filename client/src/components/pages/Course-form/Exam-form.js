import React, { useState, useEffect } from "react";
import "./CreateQuiz.css";
import {
	Container,
	Typography,
	Grid,
	Slider,
	Select,
	MenuItem,
	Button,
	Snackbar,
} from "@material-ui/core";
import TextInput from "./TextInput"
import {
	KeyboardDatePicker,
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { Redirect } from "react-router";
import Loading from "./Loading";
import { Alert } from "@material-ui/lab";
import { AccessAlarm } from "@material-ui/icons";


function Examform( {loggedUser, close} ) {
	const [quizName, setQuizName] = useState("");
	const [quizDate, setQuizDate] = useState(new Date());
	const [duration, setDuration] = useState(5);
	const [type, setType] = useState("private");

	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [redirectEdit, setRedirectEdit] = useState(false);
	const [quizId, setQuizId] = useState("");

	const [error, setError] = useState(false);



	const onQuizNameChange = (event) => {
		setQuizName(event.target.value);
	};

	const handleDateChange = (date) => {
		setQuizDate(date);
	};

	const handleTimeChange = (e, val) => {
		setDuration(val);
	};

	const onTypeChange = (event) => {
		setType(event.target.value);
	};

	const handleSubmit = async () => {
		setLoading(true);
		let token = loggedUser?.token; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkFkbWluIiwidXNlcklkIjoiNjBjMzQ1OTVmYWNlZDIzYmFjMGZlNzdhIiwiZW1haWwiOiJ2b3Zpbm9qOTMxQGQ0d2FuLmNvbSIsIm5hbWUiOiJ2b3Zpbm9qOTMxQGQ0d2FuLmNvbSIsIm1vYmlsZU51bWJlciI6MTExMTExMTExMSwiaWF0IjoxNjIzNzgzMTE5LCJleHAiOjE2MjM4Njk1MTl9.57HkcAF9aURgh5C-3A1U-vgAa0qs0sAS2gTbo6fObOA';// localStorage.getItem("authToken");
		let url = "http://localhost:3000/quiz/createQuiz";

		let captcha = null; // await executeRecaptcha("create_quiz");

		let data = {
			quizName: quizName,
			scheduledFor: quizDate.getTime(),
			quizDuration: duration,
			quizType: type,
			captcha: captcha,
		};

		try {
			await axios.create({
				baseURL: url,
				withCredentials: true
			  }).post(url, data, {
					headers: {
						"auth-token": token
					},
				})
				.then((res) => {
					setQuizId(res.data.result._id);
					setLoading(false);
					close(res.data.result._id, res.data.result.quizName);
				});
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		let token = localStorage.getItem("authToken");
	}, []);

	if (loading) {
		return <Loading />;
	} else if (redirect) {
		return <Redirect to="/dashboard" />;
	} else if (redirectEdit) {
		return <Redirect to={`/editQuiz/${quizId}`} />;
	} else {
		return (
			<Container className="create-quiz-page">
				<div className="create-form">
					<Typography variant="h4" className="create-head">
						Quiz Details
					</Typography>
					<div className="create-form-inputs">
						<TextInput
							variant="outlined"
							label="Quiz Name"
							value={quizName}
							onChange={onQuizNameChange}
							name="Quiz Name"
							className="form-input"
						/>

						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid
								className="date-time-select"
								container
								spacing={3}
							>
								<Grid item xs={12} sm={6}>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										label="Select Quiz Date"
										value={quizDate}
										onChange={handleDateChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<KeyboardTimePicker
										ampm={true}
										format="hh:mm:ss aa"
										views={["hours", "minutes", "seconds"]}
										margin="normal"
										label="Select Quiz Start Time"
										value={quizDate}
										onChange={handleDateChange}
										keyboardIcon={<AccessAlarm />}
									/>
								</Grid>
							</Grid>
						</MuiPickersUtilsProvider>
						<p style={{ marginTop: "5%", marginBottom: "5%" }}>
							Quiz Time (in minutes):
						</p>
						<Slider
							defaultValue={5}
							aria-labelledby="quiz time slider"
							step={5}
							min={5}
							max={60}
							valueLabelDisplay="on"
							marks
							className="time-slider"
							value={duration}
							onChange={handleTimeChange}
						/>
						<p>Select quiz type: </p>
						<Select
							value={type}
							onChange={onTypeChange}
							className="type-select"
						>
							<MenuItem value="public">Public</MenuItem>
							<MenuItem value="private">Private</MenuItem>
						</Select>

						<Button
							className="login-btn create-btn"
							onClick={handleSubmit}
						>
							Create Quiz
						</Button>
						<Typography
							variant="subtitle1"
							className="create-subtitle"
						>
							NOTE: After creating the quiz, you can add questions
							by editing the quiz in YOUR QUIZZES section of the
							dashboard.
						</Typography>
					</div>
				</div>
				<Snackbar
					open={error}
					autoHideDuration={5000}
					onClose={() => setError(false)}
				>
					<Alert
						variant="filled"
						severity="error"
						onClose={() => setError(false)}
					>
						There was a problem. Please try again!
					</Alert>
				</Snackbar>
			</Container>
		);
	}
}

export default Examform;

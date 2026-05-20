import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";

export function FaqSec() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries(formData.entries());
    // const email = formJson.email;
    // console.log(email);
    handleClose();
  };

  return (
    <section id="suggestions" className="w-full py-16 px-4 lg:px-0 bg-linear-to-r from-blue-600 to-indigo-600 text-white scroll-mt-28">
      <Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="lg:text-4xl text-xl font-bold leading-normal sm:text-3xl xs:text-2xl mb-2">
          Help Us Improve Your Career Experience
        </h2>

        {/* <!-- Subtitle --> */}
        <p className="sm:text-lg text-md font-normal text-blue-100 mb-8 max-w-2xl mx-auto">
          Your feedback helps us refine our system and deliver smarter, more
          accurate career guidance tailored to your needs.
        </p>

        <button
          onClick={handleClickOpen}
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-100 transition duration-300"
        >
          Share Feedback
        </button>
      </div>
    </section>
  );
}

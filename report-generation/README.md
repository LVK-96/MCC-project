This is a cloud function for generating pdf reports of projects.

You can test the function locally with the [Google cloud functions emulator](https://cloud.google.com/functions/docs/emulator). However the I haven't figured out a way to make local storage work (saving to local storage seems to corrupt the PDF). Even when running the function in the emulator, it is actually using the firebase cloud storage.

To run the emulator

```bash
functions-emulator start
functions-emulator deploy generatePDF --trigger-http
```

I wrote a shell script that uses curl to post dummy data to test the function

```bash
./test_generation.sh
```

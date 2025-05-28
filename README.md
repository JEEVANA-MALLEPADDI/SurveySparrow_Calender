# SurveySparrow_Calender


A responsive and interactive calendar application built using **React**, **Vite**, and **TailwindCSS**, **dayjs**. This calendar displays the current month by default, supports event scheduling from a static JSON file, and handles overlapping events with visual cues.

---

## Features

 **Default View:** Displays the current month and year with a neatly arranged grid of dates.
![1](https://github.com/user-attachments/assets/c1a89511-4959-4744-9161-db94c0d861f3)



 **Month Navigation:** Easily navigate between previous and next months using navigation buttons.
![image](https://github.com/user-attachments/assets/c6c7d0b4-1c21-4e88-9a9f-52b655a56795)

 ![image](https://github.com/user-attachments/assets/61879832-c951-448e-92cf-876ebf79f61e)

**Highlight Today:** The current date is automatically highlighted for better visibility.
![image](https://github.com/user-attachments/assets/dc69e137-0023-4dda-8414-aa3ad1450a31)


**Event Display:** Events are fetched from a static JSON file and displayed on their corresponding dates.
![image](https://github.com/user-attachments/assets/209f2657-70a1-4d27-914c-68fea4943489)

**Event Details:** Each event includes a title, date, time duration.
![image](https://github.com/user-attachments/assets/a6b730af-6f9d-4be5-b7f4-23b787227810)

**Conflict Management:** Implements a timeline-style layout for daily events, allowing users to clearly see overlapping events by time. Events are stacked vertically by their time slots to avoid confusion.
![image](https://github.com/user-attachments/assets/33940df8-fe00-42a2-bfbd-d3e5eef655a4)


**Dark/Light Mode Toggle:** Users can switch between light and dark themes using a toggle button.

![image](https://github.com/user-attachments/assets/8f30a4ea-0604-4de5-9b0c-226c52113158)

---

##  Tech Stack

**Frontend:** React, Vite
**Styling:** TailwindCSS
**Event Data:** Static JSON file
**Date Utility:** Day.js

## Getting Started

Follow these steps to set up and run the project locally:

#### 1. Clone the Repository


git clone https://github.com/your-username/SurveySparrow_Calendar.git
cd SurveySparrow_Calendar

#### Installing Dependencies

**Run this command to install all required dependencies listed in the `package.json`:
>>npm install

If you want to install specific packages manually, you can run:

>>npm install -D tailwindcss @tailwindcss/vite
>>npm install @heroicons/react
>>npm install dayjs




[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/rodolphe37/my-simple-tasks-manager-/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/rodolphe37/my-simple-tasks-manager-/graphs/commit-activity)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://github.com/rodolphe37/my-simple-tasks-manager-)
[![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/)
[![GitHub issues](https://badgen.net/github/issues/rodolphe37/my-simple-tasks-manager-/)](https://github.com/rodolphe37/my-simple-tasks-manager-/issues)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/rodolphe37/my-simple-tasks-manager-)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)


[![Website](https://i.imgur.com/xSu6S5v.png)](https://rodolphe-augusto.fr)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dfc0a8ac-52da-436a-b55b-ba6cbf4c59f4/deploy-status)](https://app.netlify.com/sites/stoic-heisenberg-2f64d7/deploys)

# Tutorial Intro

---

## <img  style =" float: left; margin-top: 5px; margin-right: 22px " src="demo/backlog.svg" alt="drawing" height="30" width="25"/>My Simple Task Manager

is a drag-and-drop task manager as well as a time tracker (not for a team, but for a single freelance developer for example)!

### :bookmark: This is a great little application when you are working alone on projects where you need to organize your tasks, as well as track the time you spend on a project to know the actual time you spent on it.



![alt text](demo/demo.gif "My Simple Tasks Manager")



## :computer: Online Demo sites


**You can try My Simple Task Manager** **[here](https://my-simple-tasks-manager.netlify.app/)**,

![alt text](demo/pwa-check-all.png "My Simple Tasks Manager")

>**:heavy_check_mark: This is Progressive Web App (PWA)**

![alt text](demo/pwa-test.png "My Simple Tasks Manager")

You can easily install this application on a Windows, Mac or Linux computer.

>Install on Ubuntu :heavy_check_mark:
>
>![alt text](demo/demoInstall.gif "My Simple Tasks Manager")


>Install on Mac OSX :heavy_check_mark:
>
>![alt text](demo/install-mac-osx.png "My Simple Tasks Manager")
---

>**:heavy_exclamation_mark: When you want to delete the Project name!**
You have two choices, delete only the project name or reset all (Project name, timer & all cards)

![alt text](demo/delete.png "My Simple Tasks Manager")

---

>**:heavy_exclamation_mark: When you want to delete an task card!**
You have one alert for confirm your wish to delete this card (with name card)

![alt text](demo/confirm-delete-card.png "My Simple Tasks Manager")

---

>**:heavy_exclamation_mark: When you Start the counter!**
The elapsed seconds are sent to the localstorage in real time, if you close the window inadvertently without stopping the counter, the elapsed time is automatically saved in the localStorage, adding to the time already present (seconds)!

![alt text](demo/real-time-seconds.gif "My Simple Tasks Manager")

---

**:x:** this application is  not responsive on mobile :mobile_phone_off: (as it is an application for people working in front of a computer - developer like me for example - I did not find useful to do media queries for that).


***(The demo is fully functional, all infos are stocked in localStorage)***

- Infos:
  - An input field, at the top right, is made to enter the name of the project you are working on!
  - 1 day of work is equivalent to 8 hours (28800 seconds)! (the calculation of the days worked in proportion to the passed seconds  is made with this logic - each 28800 elapsed seconds increment one day more)
  - When you start the counter, the seconds passed are sent to the localstorage in real time, when you stop the counter, the seconds passed add to the total and when you restart the counter, the count continues from this beginning.
  - When you click on reset button, it's reset the time in the state app & remove time to localStorage ( at each project beginning you can put to 0 the counter)
  - All the cards and their contents are synchronized with the localstorage.
  - The different states of the cards, according to the columns (To Do, In Progress, Done) are also synchronized with the localStorage.
  - You can delete only the project name or you can reset all things in the App (Project name, timer & all cards)

![alt text](demo/localStore.png "My Simple Tasks Manager")

---

## :microscope: Getting Started!

you just have to **clone this repository**.

---

## :satellite: Install dependencies

On the root folder:

```shell
yarn
```
or
```shell
npm i
```
---

## :rainbow: Start the App

```shell
yarn start
```
or
```shell
npm start
```


Your site starts at `http://localhost:3000`.

---


* **Enjoy!**


---

## :bust_in_silhouette: Author

- Thought, designed and developed with :purple_heart: by Rodolphe Augusto

---

## :large_blue_diamond: A few words from the author

Enjoy the World :smirk:

**:memo: To Do for the next version:**

>:bar_chart: Add a dashboard of statistics (number of tasks created for each day & total project tasks, time spent - with chronology (date - time - time spent for each work day), total number of hours on the project).

---

## :sparkling_heart: Support the project

I put almost everything open-source I can, and try to accommodate anyone who needs help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and are happy with it or just want to encourage me to keep creating: -

- Put a star and share the project :rocket:

Thank you! :heart:

---

## :scroll: License

MIT

---


//Places the top players on the leaderboard
async function leaderBoard() {
    const leaderboard = await readDatabase();
    let board = document.getElementById("leaders");
    for (let i in leaderboard) {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerText = leaderboard[leaderboard.length - i - 1].username;
        if (i == 0) {
            li.classList.add("list-group-item-success");

        } else if (i % 2 == 0) {
            li.classList.add("list-group-item-secondary");

        } else if (i % 2 == 1) {
            li.classList.add("list-group-item-light");
        }
        let span = document.createElement("span");
        span.classList.add("float-right");
        span.innerText = leaderboard[leaderboard.length - i - 1].score + "ft";
        li.appendChild(span);
        board.appendChild(li);
    }
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(snapshot => {
                let high = document.getElementById("top");
                high.innerText = "Your High Score: " + snapshot.data().score + "ft";
            })
        } else {

        }
    });
}

//Reads the database for the top players
const readDatabase = async function () {
    let leaderboard = [];
    let j = await db.collection('users').where("score", ">", 0).orderBy('score').limit(10).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().username != undefined) {
                leaderboard.push({
                    "username": doc.data().username,
                    "score": doc.data().score
                });
            }
        });
    });
    return leaderboard;
}
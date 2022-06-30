const DOORS = ['A', 'B', 'C'];


function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function array_rand(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function array_clone(array) {
    return array.slice(0);
}

function array_without(array, index) {
    array = array_clone(array);
    array.splice(index, 1);
    return array;
}

function help_debug_decrease_run_times_number() {
    if (document.getElementById('debug').value == 1) {
        document.getElementById('run_times').value = 100;
    }
}

function run() {

    const RUN_TIMES = document.getElementById('run_times').value;
    const DEBUG = parseInt(document.getElementById('debug').value);
    
    let wins = 0;
    let losses = 0;

    document.getElementById('result').innerHTML = '';

    for (let count = 0; count < RUN_TIMES; count++) {

    
        let player_first_choice = random_int(0,2);
        let choices_without_player_first_choice = array_without(array_clone(DOORS), player_first_choice);
        let it_is_not_on = array_rand(choices_without_player_first_choice);
        let it_is_not_on_elem = it_is_not_on[0];
        let it_is_not_on_index = DOORS.indexOf(it_is_not_on_elem);
        let premium_is_on_array = array_without(array_clone(DOORS), it_is_not_on_index);
        let premium_is_on = array_rand(premium_is_on_array);
        // now the paradox assumes the player will always need to change the door from first choice to get a 2/3 of victory:
        let next_choice = premium_is_on_array.indexOf(DOORS[player_first_choice]); 
        let player_changes_to = array_without(premium_is_on_array, next_choice);
        let player_won = premium_is_on[0] == player_changes_to[0];
        
        if (DEBUG) {

            document.getElementById('result').innerHTML += `<tr>
                <td>${DOORS[player_first_choice]}</td> 
                <td>${JSON.stringify(choices_without_player_first_choice)}</td>
                <td>${JSON.stringify(it_is_not_on)}</td>
                <td>${JSON.stringify(premium_is_on_array)}</td>
                <td>${JSON.stringify(premium_is_on)}</td>
                <td>${JSON.stringify(player_changes_to)}</td>
                <td>${player_won}</td>
            </tr>
            `;

            // console.log(
            // 'Doors:', DOORS, 
            // `| Player first choice: ${DOORS[player_first_choice]}` , 
            // '| Choices without player first choice:', choices_without_player_first_choice,
            // `| it is not on: ${it_is_not_on}`,
            // '| The Premium is on this array:', premium_is_on_array,
            // '| Premium is on:', premium_is_on,
            // '| Player changes to: ', player_changes_to,
            // '| Player won? ', player_won
            // );
        
        }

        if (premium_is_on[0] == player_changes_to[0]) {
            wins++;
        } else {
            losses++;
        } 

    }

    document.getElementById('sums').innerHTML = `Wins: ${wins} | Losses: ${losses} (${ (wins * 100 / RUN_TIMES).toFixed(2) }% / ${(losses * 100 / RUN_TIMES).toFixed(2)}%)`;

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('run_btn').addEventListener('click', run);
    document.getElementById('debug').addEventListener('change', help_debug_decrease_run_times_number);
});
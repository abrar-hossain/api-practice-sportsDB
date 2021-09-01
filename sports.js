const loadTeams = async () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    if (searchText === '') {
        document.getElementById('error').innerText = 'Search field can not be empty';
        document.getElementById('search-team').innerText = '';
        document.getElementById('team-detail').innerText = '';
        return;
    }
    document.getElementById('error').innerText = '';
    document.getElementById('search-team').innerText = '';
    document.getElementById('team-detail').innerText = '';

    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displayTeam(data.teams);
}

const displayTeam = teams => {
    //console.log(teams);
    const searchTeam = document.getElementById('search-team');
    if (teams == null) {
        document.getElementById('error').innerText = 'Result not found';
        return;
    }
    teams.forEach(team => {
        //console.log(team);
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="loadTeamDetail('${team.idTeam}')">
        <img src="${team.strTeamBadge}"
        >
        <h4>${team.strTeam}</h4>`;

        searchTeam.appendChild(div);
    });

}

const loadTeamDetail = async teamId => {
    //console.log(details);

    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayTeamDetail(data.teams[0]);
}

const displayTeamDetail = team => {
    //console.log(team);
    const teamDetailContainer = document.getElementById('team-detail');
    teamDetailContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `<h3>${team.strTeam}</h3>
    <img src="${team.strTeamBadge}">
    <p>${team.strDescriptionEN}</p>
				<p>League:</p>
				<p>${team.strLeague}</p>
                <p>${team.strStadiumLocation}</p>
    `;
    teamDetailContainer.appendChild(div);
}
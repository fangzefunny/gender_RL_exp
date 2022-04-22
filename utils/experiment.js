// -----------------------------
//            Welcome    
// -----------------------------
/* 
Include the participant information
The pkgs we are going to use is the survey html
*/
var welcomeScreen = {
    type: 'survey-html-form',
    preamble: "<p>Welcome to the experiemnt</p>" + 
            "<p>Please complete the form</p>",
    html: "<p>Participant ID: <input name='Sub_id' type='text'/></p>",
    data: {screen_id: "welcome"},
    on_finish: function(data){
        jsPsych.data.addProperties({
            sub_id: data.response.Sub_id,
        })
    }
};

// ------------------------------
//         Instruction    
// ------------------------------
var instructScreen = {
    type: 'instructions',
    pages: [
        "<p> In this experiment, a circle will appear in the middle of the screen. </p>"+ 
        "<p> If the color is <b>Blue</b>, press \"F\". </p>" +
        "<p> If the color is <b>Red</b>, press \"J\".  </p>" +
        "<div style='float: left'><img src='img/Blue.png' height='200'/>"+
        "<p>Press the key \"F\" </p></div>"+
        "<div style='float: right'><img src='img/Red.png' height='200'/>"+
        "<p>Press the key \"J\" </p></div>",
        'Let\'s start some pratice first',    
    ],
    data:{
        screen_id: 'instruct'
    },
};

// ------------------------------
//            Trials   
// ------------------------------
/*Fixation*/ 
var fixationScreen = {
    type: "html-keyboard-response",
    stimulus: "<div style='font-size: 100px'><b>+</b></div>",
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
        screen_id: "fixation", 
        stimulus: "fixation",
    }
};

/*Response Screen*/ 
var responseScreen = {
    type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable("stimulus"),
    data: jsPsych.timelineVariable("data"),
    stimulus_height: 350,
    stimulus_width:  350,
    choices: ['j', 'f'],
    trial_duration: null,
    on_finish: function(data){
        // calculate if the response is correct
        if (data.response == data.corAct){
            data.acc = 1 
        }else{
            data.acc = 0 
        }
    }
};

/*Feedback Screen*/ 
var feedbackScreen = {
    on_start: function(trial){
        trial.data = {screen_id: "feedback"}
    },
    type: "html-keyboard-response",
    stimulus: function(){
        // obtain data from the previous trial
        // to read the jsPsych data we use get 
        // there is many data and we get the last trials
        // there is a lost of operation we can do for last trial
        // we choose to directly read the value
        // [0] is the data in the jsPsych screen. 
        var lastAcc = jsPsych.data.get().last(1).values()[0].acc;
        if (lastAcc == 1){
            return "<div style='font-size: 60px'>Correct<\div>"
        }else{
            return "<div style='font-size: 60px'>Incorrect<\div>"
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

/*A Block*/
var stimSpace = [
    {
    stimulus: "img/blue.png", 
    data: {screen_id: "blue trial",
    corAct: 'j'}
    },
    {
    stimulus: "img/Red.png", 
    data: {screen_id: "red trial",
    corAct: 'f'}
    },
]
var trialTimeline = {
    timeline: [fixationScreen, responseScreen, feedbackScreen],
    timeline_variables: stimSpace,
    randomize_order: true, 
    repetitions: 5,
};

// ------------------------------
//        The whole task   
// ------------------------------
var taskTimeline = [];
taskTimeline.push(
    welcomeScreen, 
    trialTimeline,
);
#pragma strict
//left video at 33:34

//Public Variables
//the speed we are moving (Walking) at, set at 3 in Unity
var walkSpeed:float;
//the speed we are moving (Walking) at, set at 3 in Unity
var runSpeed:float;
//uses the mouse to rotate/turn the character.
//set at 110 in Unity
var rotationSpeed:float;
//variable to put the Animation speed into, so animations will play at the speed we are moving at
var walkAnimSpeed:float;

//Private Variables
//as it is private Unity cannot access it from the inspector
private var charController:CharacterController;

function Start () {
	//initialise the charController variable
	charController = GetComponent(CharacterController);
}

function Update () {

//if statement to determine which button is pressed
//set the sensativity & gravity of the Input vertical & horizontal to 1000
	if(Input.GetAxis("Vertical") > 0){
		Debug.Log("Up/Forward");
		//check to see if we are running (holding down left shift)
		//the GetButton.Shift reflects what we called it in the Input settings in Unity
		if (Input.GetButton("Shift")){
			Debug.Log("Running");
			charController.Move(transform.forward * runSpeed * Time.deltaTime);	//forward * speed per second (not speed per frame)
		}
		else {
			//Animation speed
			animation['walk'].speed = walkAnimSpeed;
			//Play the walk animation
			animation.CrossFade("walk");
			//use the charController variable to move the character (lowercase t retrieves the transform from unity)
			charController.Move(transform.forward * walkSpeed * Time.deltaTime);	//forward * speed per second (not speed per frame)
		}
	}
	
	else if(Input.GetAxis("Vertical") < 0){
		Debug.Log("Down/Backwards");
		//check to see if we are running (holding down left shift)
		//the GetButton.Shift reflects what we called it in the Input settings in Unity
		if (Input.GetButton("Shift")){
			Debug.Log("Running");
			charController.Move(transform.forward * runSpeed * Time.deltaTime);	//forward * speed per second (not speed per frame)
		}
		else {
			//Animation speed, negative as we are playing the animation backwards
			animation['walk'].speed = -walkAnimSpeed;
			//walking backwards doesn't loop by default, this should force it
			//animation["walk"].time = animation["walk"].length;
			//Play the walk animation
			animation.CrossFade("walk");
			//use the charController variable to move the character (lowercase t retrieves the transform from unity)
			charController.Move(transform.forward * -walkSpeed * Time.deltaTime);	//negative forward * speed per second (not speed per frame)
		}
		
	}
	// no run speed applied to strafe, because it's a bit silly
	else if(Input.GetAxis("Horizontal") > 0){
		Debug.Log("Right");
		//use the charController variable to move the character (lowercase t retrieves the transform from unity)
		charController.Move(transform.right * walkSpeed * Time.deltaTime);	//right * speed per second (not speed per frame)
	}
	else if(Input.GetAxis("Horizontal") < 0){
		Debug.Log("Left");
		//use the charController variable to move the character (lowercase t retrieves the transform from unity)
		charController.Move(transform.right * -walkSpeed * Time.deltaTime);	//negative right * speed per second (not speed per frame)
	}
	
	//end of the if statement
	
	transform.Rotate(Vector3(0, Input.GetAxis("Mouse X") *rotationSpeed * Time.deltaTime, 0));
	
}
# Start meteor app in development|staging|production mode using this script
# Make file executable before running it: using chmod +x
# Run as ./start-app.sh (development|staging|production)


#Environment variables
export ENV=$1 #environment
export PORT=3000

if [ -z $2 ]  #ROOT_URL is mandatory.
then
  echo "Require ROOT_URL";
  exit 1;
fi

export ROOT_URL=$2

valid_envs=( development staging production );
validated="false"

for valid_env in ${valid_envs[@]}
do
	if [ "$valid_env" = "$1" ]; then
		$validated = "true"
		echo Starting app
		mkdir -p ~/logs
		cd logs
		file="EventPages.log"
		if [ ! -e "$file" ] ; then
			touch "$file"
		fi

		if [ ! -w "$file" ] ; then
			echo cannot write to $file
			exit 1
		fi

		cd ..

		nohup meteor --production --port $PORT >>./logs/EventPages.log 2>&1 &
		echo "Started app in $ENV mode"

		echo "Press Enter to return to terminal"
		exit 0;
	fi
done

if [ -z "$1" -o "$validated" = "false" ];
#if [ -z "$1" ];
then
	echo "Require valid environment: ./start-app.sh (development|staging|production)"
	exit 1;
fi


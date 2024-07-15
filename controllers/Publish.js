import { MQTTService } from "../service/mqttService.js";
import Sala from "../models/SalaModel.js";

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtt://10.49.7.81:1883";

const updateSala = async function (lockId, lockState) {
  try {
    const sala = await Sala.findOne({
      where: {
        numero: lockId,
      },
    });
    // if (!sala) return res.status(404).json({ msg: "Data not found" });
    if (!sala) return { error: "Data not found" };
    const status = lockState;
    if (sala.status !== undefined) {
      await Sala.update(
        { status },
        {
          where: {
            id: sala.id,
          },
        }
      );
      // res.status(200).json({ msg: "Sala updated successfully" });
      console.log("Sala updated");
      return { success: true };
    } else {
      // res.status(400).json({ msg: "Invalid sala status" });

    }
  } catch (error) {
    // res.status(500).json({ msg: error.message });
    // console.log(error);
    return { error: error.message };
  }
};

const messageCallback = async (topic, message) => {
  const command = message.toString();
  let piece = 0;
  var lockId = '';
  var lockState = '';
  for (var i = 0; i < command.length; i++) {
    if (command[i] != "-" && piece === 0) {
      lockId += command[i];
    } else if (command[i] != "-" && piece === 1) {
      if (command[i] === "O") {
        lockState = "ativo";
      } else {
        lockState = "inativo";
      }
    } else {
      piece = 1;
    }
  }
  await updateSala(lockId, lockState);
};

var mqttClient = new MQTTService(MQTT_HOST_NAME, messageCallback);
mqttClient.connect();
mqttClient.subscribe("locksPong");

export const getPublisherPage = async function (req, res) {
  try {
    res.render("pages/publisher");
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

export const publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    const sala = await Sala.findOne({
      attributes: ["status"],
      where: {
        numero: message,
      },
    });

    mqttClient.publish(topic, message, {});

    let counter = 0;
    var novoStatus = sala;
    while(novoStatus.status == sala.status && counter <= 4){
      novoStatus = Sala.findOne({
        attributes: ["status"],
        where: {
          numero: message,
        },
    });
    console.log("teste!!!!!!!!!!!!!");
    counter++;
    if(counter <= 2){
      sleep(1000);
    }else{
      sleep(2000);
    }
    }
    if(novoStatus.status !== sala.status){
      res
        .status(200)
        .json({ status: "200", message: "Sucessfully status changed" });
    }else{
      res.status(400).json({ status: 400, message: "Something went wrong"});
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
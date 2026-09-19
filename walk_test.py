from boosteros.robots.booster import BoosterRobot
import time


def main():
    robot = BoosterRobot()

    print("Setting robot to walk mode...")
    robot.set_mode("walk")

    print("Setting default gait...")
    robot.set_gait("default")

    print("Walking forward...")
    robot.set_velocity(0.2, 0.0, 0.0)

    time.sleep(3)

    print("Stopping robot...")
    robot.set_velocity(0.0, 0.0, 0.0)

    print("Walk test complete.")


if __name__ == "__main__":
    main()
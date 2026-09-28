#include <booster/robot/b1/b1_loco_client.hpp>
#include <booster/robot/channel/channel_factory.hpp>
#include <booster/robot/rpc/error.hpp>

#include <chrono>
#include <cstdint>
#include <iostream>
#include <thread>

int main(int argc, char const *argv[]) {
    if (argc < 2) {
        std::cout << "Usage: " << argv[0] << " <network_ip>" << std::endl;
        return 1;
    }

    std::cout << "Using network IP: " << argv[1] << std::endl;

    // starting the Booster communication
    booster::robot::ChannelFactory::Instance()->Init(0, argv[1]);

    booster::robot::b1::B1LocoClient client;
    client.Init();

    std::cout << "Waiting for locomotion service..." << std::endl;

    if (!client.WaitForService(5000)) {
        std::cerr << "Locomotion service is not available." << std::endl;
        return 1;
    }

    std::cout << "Locomotion service found." << std::endl;

    int32_t ret;

    std::cout << "Preparing robot..." << std::endl;
    ret = client.ChangeMode(booster::robot::RobotMode::kPrepare);
    std::cout << "ChangeMode(kPrepare): " << ret << std::endl;

    // give the robot some time to switch into prepare mode
    std::this_thread::sleep_for(std::chrono::seconds(2));

    std::cout << "Switching to walking mode..." << std::endl;
    ret = client.ChangeMode(booster::robot::RobotMode::kWalking);
    std::cout << "ChangeMode(kWalking): " << ret << std::endl;

    // waiting for walking mode to fully switch before moving
    // found during testing that Move() can fail if it is called straight away
    std::this_thread::sleep_for(std::chrono::seconds(2));

    std::cout << "Walking forward at 0.5 m/s..." << std::endl;
    ret = client.Move(0.5F, 0.0F, 0.0F);
    std::cout << "Move(0.5, 0, 0): " << ret << std::endl;

    std::this_thread::sleep_for(std::chrono::seconds(3));

    std::cout << "Stopping robot..." << std::endl;
    ret = client.Move(0.0F, 0.0F, 0.0F);
    std::cout << "Move(0, 0, 0): " << ret << std::endl;

    std::cout << "Walk test complete." << std::endl;

    return 0;
}
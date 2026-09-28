#include <booster/robot/b1/b1_loco_client.hpp>
#include <booster/robot/channel/channel_factory.hpp>
#include <booster/robot/rpc/error.hpp>

#include <chrono>
#include <cstdint>
#include <iostream>
#include <thread>

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <network_ip>\n";
        return 1;
    }

    std::cout << "Using network IP: " << argv[1] << std::endl;

    booster::robot::ChannelFactory::Instance()->Init(0, argv[1]);

    booster::robot::b1::B1LocoClient client;
    client.Init();

    std::cout << "Waiting for locomotion service..." << std::endl;

    if (!client.WaitForService(5000)) {
        std::cerr << "Locomotion service is not available." << std::endl;
        return 1;
    }

    std::cout << "Setting Prepare mode..." << std::endl;
    int32_t ret =
        client.ChangeMode(booster::robot::RobotMode::kPrepare);

    std::cout << "ChangeMode(kPrepare): " << ret << std::endl;

    // give the robot some time to switch into prepare mode
    std::this_thread::sleep_for(std::chrono::seconds(2));

    std::cout << "Executing K1 boxing-style kick..." << std::endl;

    // use the boxing-style kick since it is supported by the K1
    ret = client.WholeBodyDance(
        booster::robot::b1::WholeBodyDanceId::kBoxingStyleKick
    );

    std::cout << "WholeBodyDance(kBoxingStyleKick): "
              << ret << std::endl;

    // waiting for the kick animation to finish
    std::this_thread::sleep_for(std::chrono::seconds(5));

    std::cout << "Kick test complete." << std::endl;

    return 0;
}

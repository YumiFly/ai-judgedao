const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting AIJudgeDAO deployment...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH\n");

  // Deployment parameters
  const PANEL_SIZE = 3;
  const VOTING_PERIOD = 24 * 60 * 60; // 24 hours in seconds
  const MIN_STAKE_REQUIRED = ethers.parseEther("1000"); // 1000 tokens
  const CHAINLINK_SUBSCRIPTION_ID = process.env.CHAINLINK_SUBSCRIPTION_ID || 0;
  const CHAINLINK_FUNCTIONS_ROUTER = process.env.CHAINLINK_FUNCTIONS_ROUTER || ethers.ZeroAddress;

  try {
    // 1. Deploy RuleSetRegistry
    console.log("📋 Deploying RuleSetRegistry...");
    const RuleSetRegistry = await ethers.getContractFactory("RuleSetRegistry");
    const ruleSetRegistry = await RuleSetRegistry.deploy(deployer.address);
    await ruleSetRegistry.waitForDeployment();
    const ruleSetRegistryAddress = await ruleSetRegistry.getAddress();
    console.log("✅ RuleSetRegistry deployed to:", ruleSetRegistryAddress);

    // 2. Deploy DisputeRegistry
    console.log("\n⚖️ Deploying DisputeRegistry...");
    const DisputeRegistry = await ethers.getContractFactory("DisputeRegistry");
    const disputeRegistry = await DisputeRegistry.deploy(
      deployer.address,
      CHAINLINK_SUBSCRIPTION_ID,
      CHAINLINK_FUNCTIONS_ROUTER
    );
    await disputeRegistry.waitForDeployment();
    const disputeRegistryAddress = await disputeRegistry.getAddress();
    console.log("✅ DisputeRegistry deployed to:", disputeRegistryAddress);

    // 3. Deploy VerdictManager
    console.log("\n👥 Deploying VerdictManager...");
    const VerdictManager = await ethers.getContractFactory("VerdictManager");
    const verdictManager = await VerdictManager.deploy(
      deployer.address,
      disputeRegistryAddress,
      PANEL_SIZE,
      VOTING_PERIOD,
      MIN_STAKE_REQUIRED
    );
    await verdictManager.waitForDeployment();
    const verdictManagerAddress = await verdictManager.getAddress();
    console.log("✅ VerdictManager deployed to:", verdictManagerAddress);

    // 4. Setup initial rule sets
    console.log("\n📚 Setting up initial rule sets...");
    
    const ruleSets = [
      {
        ipfsHash: ethers.keccak256(ethers.toUtf8Bytes("general-dispute-rules-v1")),
        title: "General Dispute Resolution Rules v1.0",
        jurisdiction: "Global"
      },
      {
        ipfsHash: ethers.keccak256(ethers.toUtf8Bytes("smart-contract-rules-v1")),
        title: "Smart Contract Dispute Rules v1.0",
        jurisdiction: "Blockchain"
      },
      {
        ipfsHash: ethers.keccak256(ethers.toUtf8Bytes("dao-governance-rules-v1")),
        title: "DAO Governance Dispute Rules v1.0",
        jurisdiction: "DAO"
      }
    ];

    for (let i = 0; i < ruleSets.length; i++) {
      const ruleSet = ruleSets[i];
      const tx = await ruleSetRegistry.addRuleSet(
        ruleSet.ipfsHash,
        ruleSet.title,
        ruleSet.jurisdiction
      );
      await tx.wait();
      console.log(`   📖 Added rule set: ${ruleSet.title}`);
    }

    // 5. Setup roles and permissions
    console.log("\n🔐 Setting up roles and permissions...");
    
    // Grant AI_ORACLE_ROLE to deployer (for testing)
    const AI_ORACLE_ROLE = await disputeRegistry.AI_ORACLE_ROLE();
    const AUTOMATION_ROLE = await disputeRegistry.AUTOMATION_ROLE();
    
    console.log("   🤖 Granting AI_ORACLE_ROLE to deployer...");
    await disputeRegistry.grantRole(AI_ORACLE_ROLE, deployer.address);
    
    console.log("   ⚙️ Granting AUTOMATION_ROLE to deployer...");
    await disputeRegistry.grantRole(AUTOMATION_ROLE, deployer.address);

    // 6. Register deployer as initial arbiter (for testing)
    console.log("\n👨‍⚖️ Registering deployer as initial arbiter...");
    const registerTx = await verdictManager.registerArbiter(MIN_STAKE_REQUIRED, {
      value: MIN_STAKE_REQUIRED
    });
    await registerTx.wait();
    console.log("   ✅ Deployer registered as arbiter");

    // 7. Display deployment summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n📋 Contract Addresses:");
    console.log("   RuleSetRegistry:  ", ruleSetRegistryAddress);
    console.log("   DisputeRegistry:  ", disputeRegistryAddress);
    console.log("   VerdictManager:   ", verdictManagerAddress);
    
    console.log("\n⚙️ Configuration:");
    console.log("   Panel Size:       ", PANEL_SIZE);
    console.log("   Voting Period:    ", VOTING_PERIOD, "seconds");
    console.log("   Min Stake:        ", ethers.formatEther(MIN_STAKE_REQUIRED), "ETH");
    
    console.log("\n🔧 Environment Variables for Frontend:");
    console.log(`NEXT_PUBLIC_DISPUTE_REGISTRY_ADDRESS=${disputeRegistryAddress}`);
    console.log(`NEXT_PUBLIC_VERDICT_MANAGER_ADDRESS=${verdictManagerAddress}`);
    console.log(`NEXT_PUBLIC_RULE_SET_REGISTRY_ADDRESS=${ruleSetRegistryAddress}`);
    
    console.log("\n📝 Next Steps:");
    console.log("1. Update frontend environment variables");
    console.log("2. Verify contracts on block explorer");
    console.log("3. Test the complete workflow");
    console.log("4. Register additional arbiters");
    
    // 8. Save deployment info
    const deploymentInfo = {
      network: await ethers.provider.getNetwork(),
      timestamp: new Date().toISOString(),
      deployer: deployer.address,
      contracts: {
        RuleSetRegistry: ruleSetRegistryAddress,
        DisputeRegistry: disputeRegistryAddress,
        VerdictManager: verdictManagerAddress
      },
      configuration: {
        panelSize: PANEL_SIZE,
        votingPeriod: VOTING_PERIOD,
        minStakeRequired: MIN_STAKE_REQUIRED.toString()
      }
    };

    const fs = require('fs');
    const path = require('path');
    
    // Create deployments directory if it doesn't exist
    const deploymentsDir = path.join(__dirname, '..', 'deployments');
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }
    
    // Save deployment info
    const deploymentFile = path.join(deploymentsDir, `deployment-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`\n💾 Deployment info saved to: ${deploymentFile}`);

  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  }
}

// Handle script execution
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

local MapGame = remodel.readPlaceFile("Place/Files/Main/GatesMap.rbxlx")
local CodeGame = remodel.readPlaceFile("Place/Files/Main/GatesProgram.rbxlx")
local SaveServices = {
	["ReplicatedStorage"] = {},
	["ServerScriptService"]  = {},
	["ServerStorage"] = {},
	["StarterPlayer"] = {
		"StarterCharacterScripts",
		"StarterPlayerScripts"
	}
}

for Service, ReplaceList in pairs(SaveServices) do
	local ServiceMap = MapGame:GetService(Service)
	local ServiceCode = CodeGame:GetService(Service)

	for _, Child in pairs(ServiceCode:GetChildren()) do
		local Replaced = false

		for _, Replacement in pairs(ReplaceList) do
			if Child.Name == Replacement then
				for _, ReplacementChild in pairs(Child:GetChildren()) do
					ReplacementChild.Parent = ServiceMap[Child.Name]
				end

				Replaced = true
				break
			end
		end

		if not Replaced then
			Child.Parent = ServiceMap
		end
	end
end

remodel.writePlaceFile("Place/Files/Main/Merge.rbxlx", MapGame)
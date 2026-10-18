export type Vehicle={id:string;type:'Car'|'Bus'|'Bike';speed:number;road:string;status:'Moving'|'Stopped'|'Slow';x:number;z:number};
export const vehicles:Vehicle[]=[
{id:'VH-001',type:'Car',speed:32,road:'Main Road',status:'Moving',x:-7,z:2},{id:'VH-002',type:'Bus',speed:18,road:'East Gate',status:'Moving',x:4,z:-1},{id:'VH-003',type:'Bike',speed:12,road:'Library Road',status:'Slow',x:1,z:5},{id:'VH-004',type:'Car',speed:0,road:'Parking Zone',status:'Stopped',x:-2,z:-4}];
export const zones=[
{name:'Library',type:'Academic Facility',occupancy:82,activity:91,status:'Operational'},
{name:'Main Auditorium',type:'Events Facility',occupancy:64,activity:68,status:'Operational'},
{name:'Block A',type:'Academic Block',occupancy:68,activity:74,status:'Operational'},
{name:'Block B',type:'Academic Block',occupancy:51,activity:52,status:'Operational'},
{name:'Block C',type:'Academic Block',occupancy:37,activity:31,status:'Operational'},
{name:'Admin Block',type:'Administration',occupancy:59,activity:61,status:'Operational'}];

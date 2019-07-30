onDynamoDb:
    DynamoDB is made up of tables containing rows which themselves contain attributs

    Keys:
        Every dynamodb table has a partition key field. This is used to partition the data for scalable access
        You can define a composite key pair via a partition key and a range key (a.k.a sort key)
            The pk/sk combo must uniquely identify a single item in the table
            You must always provide the partition key when querying, however, the range key
                can be ommitted or defined with a range of values to return a list of results

    LSI:
        An LSI is specific to a partition defined by the table's initial partition key
        It must be created at table creation time
        LSI pk/sk does not need to be unique (unlike a pk/sk pair)
        It is queried by specifying the index name
        It always projects key attributes but can be configured to project any or all of the other attributes
    
        Sparse indexes:
            You can create a sparse index by only adding an attribute in certain circumstances and removing it when it's no longer applicable
            This limits the number of items contained in the index and improves search performance.
            Ex:
                Order Table
                    PK is customerId
                    RK is order timestamp
                    isActive attribute is assigned when an order is being prepared, shipped, etc. and is removed entirely once it's been delivered
                    This allows you to quickly get a small list of the active orders

    GSI:
        A GSI works basically as if you'd configured a new dynamodb table on the same table
        You can define a new pk or pk/sk sort pair
        It will require it's own R/W capacity as it is basically another table
